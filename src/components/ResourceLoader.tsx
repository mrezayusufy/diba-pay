import React from 'react';
import { useQuery, QueryFunction, UseQueryResult } from '@tanstack/react-query';

interface ResourceLoaderProps<T> {
  queryKey: string;
  queryFn: QueryFunction<T>;
  children: (data: T) => JSX.Element;
  resourceName: string;
}

export function ResourceLoader<T>({ queryKey, queryFn, children, resourceName }: ResourceLoaderProps<T>) {
  
  const { data, error, isLoading }: UseQueryResult<T> = useQuery({queryKey: [queryKey], queryFn});
  if (isLoading) {
    return <div className="text-xl flex-1 flex justify-center">⏳</div>;
  }
  
  if (error) {
    return <div>🚩: {(error as Error).message}</div>;
  }
  
  if (!data) {
    return <div>🏳 هیچی نیست</div>;
  }
  console.log(data);

  return <>
    {React.Children.map(children, child => {
      if(React.isValidElement(child)) return React.cloneElement(child, { [resourceName]: data})
      return child
    })}
  </>
}