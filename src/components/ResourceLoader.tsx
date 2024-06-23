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
    return <div className="flex flex-1 justify-center text-xl">⏳</div>;
  }
  
  if (error) {
    return <div>🚩: {(error as Error).message}</div>;
  }
  
  if (!data) {
    return <div>🏳 هیچی نیست</div>;
  }

  return <>
    {React.Children.map(children, child => {
      if(React.isValidElement(child)) return React.cloneElement(child, { [resourceName]: data})
      return child
    })}
  </>
}