
import React from 'react';
import NavBar from './NavBar';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && <h1 className="text-3xl font-bold text-foreground">{title}</h1>}
            {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
      <footer className="bg-muted/30 py-6 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Verdant Acre — Sustainable Farming AI System</p>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
