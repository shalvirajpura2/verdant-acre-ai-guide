
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import MarketResearcherAgent from '@/components/agents/MarketResearcherAgent';

const MarketResearcherPage = () => {
  return (
    <PageLayout 
      title="Market Researcher" 
      subtitle="Analyze market trends and identify profitable crop opportunities"
    >
      <MarketResearcherAgent />
    </PageLayout>
  );
};

export default MarketResearcherPage;
