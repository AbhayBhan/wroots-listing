import React from 'react';
import {Routes, Route} from 'react-router-dom';
import SearchLayout from './layouts/SearchLayout';
import Search from './pages/Search';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import JobListing from './pages/JobListing';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<SearchLayout />}>
          <Route path='/' index element={<Search />} />
        </Route>
        <Route path='/job' element={<JobListing />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
