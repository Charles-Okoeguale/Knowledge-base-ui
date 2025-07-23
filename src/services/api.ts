const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export interface UploadResponse {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  totalChunks: number;
  chunks: string[];
  metadata: Record<string, any>;
  createdAt: string;
}

export interface QueryRequest {
  question: string;
  filters?: {
    dateRange?: {
      start: string;
      end: string;
    };
    categories?: string[];
    author?: string;
  };
}

export const api = {
  async uploadDocument(file: File, metadata?: Record<string, any>): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${errorText}`);
    }

    return response.json();
  },

  async queryDocument(request: QueryRequest): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Query failed: ${errorText}`);
    }

    return response.text();
  },
};