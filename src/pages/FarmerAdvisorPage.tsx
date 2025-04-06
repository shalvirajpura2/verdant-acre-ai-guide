
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import FarmerAdvisorAgent from '@/components/agents/FarmerAdvisorAgent';

const FarmerAdvisorPage = () => {
  return (
    <PageLayout 
      title="Farmer Advisor" 
      subtitle="Get sustainable farming recommendations based on your land data and preferences"
    >
      <FarmerAdvisorAgent />
    </PageLayout>
  );
};

export default FarmerAdvisorPage;
