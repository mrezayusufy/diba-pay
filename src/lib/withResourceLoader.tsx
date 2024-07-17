"use client"
import React, { ComponentType, use, useEffect } from 'react';
import { useQuery, QueryFunction } from '@tanstack/react-query';
import { AuthContext } from '@/providers';
import { setAuthToken } from './';

interface ResourceLoaderProps<T> {
  queryKey: string;
  queryFn: QueryFunction<T>;
  resourceName: string;
  token: string;
}

export function withResourceLoader<T>(
  WrappedComponent: ComponentType<any>,
  { queryKey, queryFn, resourceName }: Omit<ResourceLoaderProps<T>, 'token'>
) {
  return function () {
    const token = use(AuthContext);

    React.useEffect(() => {
      setAuthToken(token);
    }, [token]);
    const { data, error, isLoading } = useQuery({queryKey: [queryKey, token], queryFn});

    if (isLoading) {
      return <div className="flex flex-1 justify-center text-xl">⏳</div>;
    }

    if (error) {
      return <div>🚩: {(error as Error).message}</div>;
    }

    if (!data) {
      return <div>🏳 هیچی نیست</div>;
    }

    const resourceProps = { [resourceName]: data };

    return <WrappedComponent {...resourceProps} />;
  };
}
