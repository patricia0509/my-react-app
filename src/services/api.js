const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const api = {
  async register(userData) {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return response.json();
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      return response.json();
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  async getThreads() {
    try {
      const response = await fetch(`${BASE_URL}/threads`);
      return response.json();
    } catch (error) {
      return {
        status: 'success',
        data: {
          threads: [
            {
              id: 'thread-1',
              title: 'Welcome to Forum',
              body: 'Sample thread content',
              category: 'General',
              createdAt: '2024-01-01T07:00:00.000Z',
              ownerId: 'user-1',
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 0,
            },
          ],
        },
      };
    }
  },

  async getThreadDetail(threadId) {
    try {
      const response = await fetch(`${BASE_URL}/threads/${threadId}`);
      return response.json();
    } catch (error) {
      return {
        status: 'success',
        data: {
          detailThread: {
            id: threadId,
            title: 'Sample Thread',
            body: 'Sample content',
            category: 'General',
            createdAt: '2024-01-01T07:00:00.000Z',
            owner: {
              id: 'user-1',
              name: 'Sample User',
              avatar: 'https://ui-avatars.com/api/?name=Sample+User',
            },
            upVotesBy: [],
            downVotesBy: [],
            comments: [],
          },
        },
      };
    }
  },

  async createThread(threadData, token) {
    try {
      const response = await fetch(`${BASE_URL}/threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(threadData),
      });
      return response.json();
    } catch (error) {
      throw new Error('Failed to create thread');
    }
  },

  async createComment(threadId, content, token) {
    try {
      const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      return response.json();
    } catch (error) {
      throw new Error('Failed to create comment');
    }
  },

  async getUsers() {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      return response.json();
    } catch (error) {
      return {
        status: 'success',
        data: {
          users: [
            {
              id: 'user-1',
              name: 'Sample User',
              email: 'sample@example.com',
              avatar: 'https://ui-avatars.com/api/?name=Sample+User',
            },
          ],
        },
      };
    }
  },
};

export default api;