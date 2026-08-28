'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Tanstack_threads_provider({ children }) {
  // الـ useState عشان مش مع كل ريريندر الكاش يضيع!
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {  
        staleTime:1000 *60 * 5 ,  // 5 mins
        rety: 3,
      },
    },
  }));

  return (
  // الـ QueryClientProvider دا مكتب الإدارة وبيقول أي حد عايز يتعامل معانا
  
  //  يكلم المدير  اللي هوا queryClient .
    <QueryClientProvider client={queryClient}>
      {children}
      {/* دي أداة الـ DevTools عشان تشوف الـ Cache قدام عينك */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}