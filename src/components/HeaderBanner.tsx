/**
 * @license
 * SPDX-License-Identifier: MIT
 */

function HeaderBanner() {
  return (
    <svg width="100%" height="auto" viewBox="0 0 1200 250" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ marginBottom: '2rem' }}>
      <defs>
        <linearGradient id="banner-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#F8F9FA', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#E9ECEF', stopOpacity: 1 }} />
        </linearGradient>
        
        <g id="app-icon-for-banner">
          <path d="M71 96C71 85.5033 79.5033 77 90 77H156L186 107M71 160V96M71 160H90C100.497 160 109 151.497 109 141V128" stroke="#007BFF" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="150" cy="120" r="35" stroke="#343A40" strokeWidth="14"/>
          <line x1="178" y1="148" x2="205" y2="175" stroke="#343A40" strokeWidth="18" strokeLinecap="round"/>
          <circle cx="150" cy="120" r="24" fill="#E7F5FF"/>
        </g>
      </defs>
      
      <rect width="1200" height="250" fill="url(#banner-gradient)"/>
      
      <use xlinkHref="#app-icon-for-banner" x="50" y="35" width="180" height="180" />

      <text x="260" y="135" fontFamily="'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif" fontSize="60" fontWeight="bold" fill="#212529">
        Redirect URI Inspector
      </text>
      <text x="265" y="180" fontFamily="'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif" fontSize="24" fill="#495057">
        Inspect, Debug, and Log URL Data
      </text>
    </svg>
  );
}

export default HeaderBanner;