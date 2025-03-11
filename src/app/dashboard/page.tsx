'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useFirebase } from '@/context/FirebaseContext';

interface TagSummary {
  id: string;
  name: string;
  scans: number;
  messages: number;
  lastActivity?: Date;
}

export default function Dashboard() {
  const { db, user } = useFirebase();
  const [loading, setLoading] = useState(true);
  const [tagSummaries, setTagSummaries] = useState<TagSummary[]>([]);
  const [totalScans, setTotalScans] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        // Fetch tags
        const tagsQuery = query(
          collection(db, 'tags'),
          where('userId', '==', user.uid)
        );
        const tagDocs = await getDocs(tagsQuery);
        
        // Fetch associated messages
        const tags = await Promise.all(
          tagDocs.docs.map(async (doc) => {
            const tagData = doc.data();
            const tagId = doc.id;
            
            // Get message count
            const messagesQuery = query(
              collection(db, 'messages'),
              where('tagId', '==', tagId),
              orderBy('timestamp', 'desc')
            );
            const messageDocs = await getDocs(messagesQuery);
            const messages = messageDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            // Count unread messages
            const unread = messages.filter((msg: any) => !msg.read).length;
            
            // Use mock data for scans and last activity since we don't have that collection yet
            return {
              id: tagId,
              name: tagData.name || `Tag ${tagId.substring(0, 5)}`,
              scans: Math.floor(Math.random() * 30), // Mock data
              messages: messages.length,
              unreadMessages: unread,
              lastActivity: messages.length > 0 ? (messages[0] as any).timestamp?.toDate() : null
            };
          })
        );
        
        // Calculate totals
        const totalScansCount = tags.reduce((sum, tag) => sum + tag.scans, 0);
        const totalUnread = tags.reduce((sum, tag) => sum + tag.unreadMessages, 0);
        
        setTagSummaries(tags);
        setTotalScans(totalScansCount);
        setUnreadMessages(totalUnread);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [db, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Summary cards */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Total Tags</h2>
          <p className="text-3xl font-bold">{tagSummaries.length}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Total Scans</h2>
          <p className="text-3xl font-bold">{totalScans}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Unread Messages</h2>
          <p className="text-3xl font-bold">{unreadMessages}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium">Your Tags</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tag ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Scans
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Messages
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {tagSummaries.length > 0 ? (
                tagSummaries.map((tag) => (
                  <tr key={tag.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{tag.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{tag.id.substring(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{tag.scans}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{tag.messages}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {tag.lastActivity ? tag.lastActivity.toLocaleString() : 'No activity'}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    You don&apos;t have any tags yet. <a href="/dashboard/tags/new" className="text-primary-600 hover:text-primary-500">Add your first tag</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 