interface Formats {
    thumbnail: {
      url: string;
    };
    small: {
      url: string;
    };
    medium: {
      url: string;
    };
    large: {
      url: string;
    };
  }
  
  interface Photo {
    id: number;
    attributes: {
      title: string;
      description: string;
      photo: {
        data: {
          id: number;
          attributes: {
            formats: Formats;
            url: string;
          };
        };
      };
    };
  }
  
  interface PhotoResponse {
    data: Photo[];
  }

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    return await $fetch<PhotoResponse>(`${config.public.strapiUrl}/api/Photos?populate=*`, {
      method: event.method,
      headers: {  
        Authorization: `Bearer ${config.strapiSecret}`,
      },
    })
  })