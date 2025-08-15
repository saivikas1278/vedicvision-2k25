import { useEffect } from 'react';

const MetaTags = ({ 
  title = 'SportSphere - Sports Community Platform',
  description = 'Join the ultimate sports community platform for athletes, coaches, and sports enthusiasts.',
  image = '/logo192.png',
  url = window.location.href,
  type = 'website'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update meta tag
    const updateMetaTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`) || 
                   document.querySelector(`meta[name="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Cleanup function to reset to defaults
    return () => {
      document.title = 'SportSphere - Sports Community Platform';
    };
  }, [title, description, image, url, type]);

  return null; // This component doesn't render anything
};

export default MetaTags;
