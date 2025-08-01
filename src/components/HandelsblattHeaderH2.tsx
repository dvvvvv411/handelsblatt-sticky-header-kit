import React, { useState, useEffect } from 'react';
import { Menu, Search, User, X } from 'lucide-react';

const HandelsblattHeaderH2 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`sticky top-0 w-full bg-white border-b border-gray-300 z-[1000] transition-shadow duration-200 ${
          isScrolled ? 'shadow-md' : ''
        }`}
        style={{ 
          minHeight: '60px',
          boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center h-full relative py-2">
          {/* LEFT SECTION - Mobile: Only Menu Button, Desktop: Menu + Search */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Menu Button - Disabled */}
            <button 
              className="flex items-center justify-center min-w-[44px] min-h-[44px] hover:bg-gray-100 rounded-lg transition-colors duration-200 md:gap-2 md:px-2"
              onClick={() => {}}
              aria-label="Menu"
            >
              <Menu size={24} className="text-gray-700" />
              <span className="text-gray-700 font-medium hidden md:inline text-base">Menü</span>
            </button>
            
            {/* Search Button - Hidden on Mobile - Disabled */}
            <button 
              className="hidden md:flex items-center justify-center min-w-[44px] min-h-[44px] hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => {}}
              aria-label="Suchen"
            >
              <Search size={24} className="text-gray-700" />
            </button>
          </div>

          {/* LOGO (ZENTRAL) - Mobile Responsive */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a 
              href="/" 
              className="hover:opacity-80 transition-opacity duration-200 block"
              onClick={(e) => e.preventDefault()}
            >
              <svg 
                className="h-5 md:h-6 lg:h-8" 
                viewBox="0 0 492 70" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M477.063 5.12085C473.782 16.2306 467.443 21.5418 459.532 21.5418H452.103V5.12085H449.885C448.852 9.15774 446.855 12.8839 444.066 15.9796C441.277 19.0754 437.779 21.4484 433.871 22.8952V25.2125H441.009V56.2234C441.009 65.5942 444 69.46 451.429 69.46C454.001 69.4412 456.511 68.6602 458.64 67.2156C460.769 65.771 462.422 63.7277 463.39 61.344L463.969 60.185L462.329 59.3147C461.773 60.293 460.993 61.1263 460.054 61.7472C459.115 62.3681 458.043 62.7591 456.925 62.8885C453.258 62.8885 452.1 60.5711 452.1 53.5194V25.2142H468.28V56.2251C468.28 65.6917 471.269 69.4616 478.7 69.4616C481.685 69.3575 484.563 68.3239 486.932 66.5051C489.301 64.6863 491.043 62.1731 491.915 59.3164L490.278 58.446C487.865 61.7334 486.225 62.8902 484.102 62.8902C480.532 62.8902 479.279 60.3789 479.279 53.521V25.2159H490.278V21.544H479.279V5.12085H477.063Z" fill="#ef6400"/>
                <path d="M131.622 34.009C132.819 32.2068 134.4 30.6918 136.252 29.5729C138.104 28.454 140.18 27.7588 142.332 27.5372C147.154 27.5372 148.795 30.5327 148.795 39.1295V57.2939C148.795 64.4437 147.737 66.1811 143.007 66.7611V68.5001H165.773V66.7611C161.144 66.6653 159.794 64.636 159.794 57.8745V38.1612C159.794 25.7007 155.935 20.0977 147.252 20.0977C144.023 20.4892 140.93 21.6271 138.217 23.4213C135.504 25.2155 133.246 27.6166 131.622 30.4346V20.0977H129.499L113.968 25.6985L114.449 27.4369C115.082 27.135 115.772 26.9708 116.474 26.955C119.561 26.955 120.527 28.9837 120.527 35.3579V57.1914C120.527 64.7257 119.561 66.6602 115.607 66.7561V68.4951H137.409V66.7561C132.779 66.6602 131.622 64.7257 131.622 57.1914V34.009Z" fill="#ef6400"/>
                <path d="M275.437 0H273.216L257.392 5.98978L257.874 7.63237L258.743 7.44014C259.373 7.26926 260.02 7.17185 260.672 7.14984C263.374 7.14984 264.338 9.37135 264.338 15.3606V58.7366C264.338 64.7241 262.889 66.657 258.454 66.7529V68.4918H281.415V66.7529C276.976 66.657 275.434 64.5319 275.434 58.7366L275.437 0Z" fill="#ef6400"/>
                <path d="M311.457 20.5794C310.82 21.23 309.957 21.6105 309.047 21.6419C307.735 21.5287 306.439 21.2695 305.185 20.8691C303.606 20.3118 301.939 20.05 300.266 20.0969C298.324 19.9148 296.364 20.1425 294.515 20.7653C292.666 21.3881 290.968 22.3922 289.531 23.7125C288.095 25.0328 286.951 26.64 286.175 28.4301C285.398 30.2203 285.006 32.1534 285.024 34.1046C285.024 40.286 286.759 42.5086 296.213 48.7882C306.926 55.8411 306.926 55.8411 306.926 59.7024C306.91 60.6139 306.705 61.5122 306.326 62.3411C305.946 63.17 305.4 63.9116 304.72 64.5195C304.041 65.1273 303.243 65.5884 302.377 65.8736C301.512 66.1589 300.596 66.2624 299.688 66.1775C293.129 66.1775 289.269 61.8314 286.954 51.88H285.314V69.1696H287.34C287.961 68.6388 288.743 68.3334 289.56 68.3026C290.051 68.2649 290.544 68.3304 291.009 68.4948C293.883 69.396 296.872 69.8837 299.884 69.9435C301.966 70.1194 304.062 69.8725 306.046 69.2176C308.03 68.5627 309.861 67.5134 311.429 66.1327C312.997 64.752 314.27 63.0685 315.171 61.1834C316.072 59.2982 316.582 57.2504 316.672 55.163C316.672 48.8857 313.679 45.3096 302.873 38.8373C295.254 34.2968 293.13 32.1734 293.13 28.9835C293.13 25.7935 295.833 23.7671 299.98 23.7671C306.059 23.7671 309.051 27.0506 311.173 36.1333H313.197V20.5794H311.457Z" fill="#ef6400"/>
                <path d="M383.307 0H381.087L365.361 5.98978L365.747 7.63237C366.659 7.37122 367.597 7.20943 368.543 7.14984C371.149 7.14984 372.306 9.66109 372.306 15.3606V58.7366C372.306 64.5313 370.667 66.657 366.325 66.7529V68.4918H389.289V66.7529C384.848 66.657 383.307 64.6277 383.307 58.7366V0Z" fill="#ef6400"/>
                <path d="M418.076 57.7697C417.048 59.0211 415.771 60.0452 414.326 60.7772C412.882 61.5092 411.301 61.9332 409.683 62.0222C408.7 62.0331 407.726 61.8392 406.822 61.4528C405.918 61.0664 405.104 60.496 404.433 59.7779C403.761 59.0599 403.247 58.2099 402.922 57.282C402.597 56.3542 402.469 55.3688 402.545 54.3887C402.545 48.8837 404.859 46.8544 418.076 40.8635V57.7697ZM418.076 61.3458V63.4737C418.076 67.9195 418.656 68.4962 423.287 68.4962H435.056V66.7594C430.328 66.663 429.074 64.6337 429.074 56.7133V35.6516C429.074 23.7679 425.216 20.0977 412.674 20.0977C401.675 20.0977 393.476 25.3146 393.476 32.1742C393.436 32.8655 393.539 33.5577 393.779 34.2072C394.019 34.8568 394.39 35.4497 394.87 35.9486C395.351 36.4476 395.929 36.8418 396.569 37.1066C397.209 37.3713 397.896 37.5008 398.589 37.487C399.244 37.5369 399.903 37.4477 400.522 37.2251C401.141 37.0026 401.705 36.6517 402.179 36.1955C402.652 35.7393 403.024 35.1881 403.27 34.5782C403.515 33.9682 403.629 33.3132 403.603 32.6561V31.2074C403.534 30.6954 403.502 30.179 403.508 29.6624C403.457 28.7576 403.606 27.8527 403.944 27.0119C404.282 26.1711 404.801 25.415 405.464 24.7972C406.127 24.1794 406.917 23.715 407.78 23.4371C408.642 23.1592 409.556 23.0744 410.455 23.1889C416.051 23.1889 418.076 26.1844 418.076 34.1065V37.4864C397.047 45.3104 391.643 49.4632 391.643 57.7714C391.563 59.3408 391.803 60.9101 392.348 62.3838C392.894 63.8574 393.734 65.2047 394.817 66.3434C395.9 67.4822 397.203 68.3887 398.647 69.0077C400.092 69.6268 401.647 69.9454 403.218 69.9443C405.778 69.7011 408.265 68.9528 410.534 67.7427C412.803 66.5326 414.809 64.8847 416.437 62.8942L417.595 61.7352L418.076 61.3458Z" fill="#ef6400"/>
                <path d="M334.39 32.6589C335.403 31.4927 336.645 30.5477 338.04 29.8828C339.434 29.218 340.95 28.8476 342.494 28.7948C349.44 28.7948 354.264 36.3291 354.264 47.245C354.264 58.259 349.728 65.9872 343.266 65.9872C339.922 65.799 336.764 64.3899 334.39 62.0272V32.6589ZM334.39 0.00769043H332.362L316.538 5.80245L317.117 7.54144C317.797 7.28967 318.516 7.15898 319.24 7.1553C322.425 7.1553 323.484 9.18292 323.484 15.366V64.4438C328.683 67.8599 334.728 69.7653 340.946 69.9477C354.936 69.9477 365.26 58.5493 365.26 43.0912C365.26 29.7599 358.218 20.1005 348.664 20.1005C346.135 20.1808 343.661 20.8623 341.446 22.0885C339.232 23.3148 337.342 25.0505 335.932 27.1522L334.869 28.6009L334.387 29.2774L334.39 0.00769043Z" fill="#ef6400"/>
                <path d="M226.943 35.8394C227.52 28.4031 231.187 24.0531 236.589 24.0531C241.799 24.0531 244.788 28.1111 245.272 35.8394H226.943ZM255.208 51.2974C254.213 53.9875 252.428 56.3134 250.086 57.9694C247.744 59.6253 244.956 60.5338 242.088 60.5752C233.503 60.5752 227.712 52.6548 226.751 39.4193H256.752C256.077 26.7628 249.902 20.0977 239.097 20.0977C226.557 20.0977 217.584 30.9171 217.584 45.9858C217.584 60.2849 225.592 69.9449 237.556 69.9449C247.394 69.9449 253.183 64.5362 256.752 52.0753L255.208 51.2974Z" fill="#ef6400"/>
                <path d="M199.023 59.3161C196.868 61.2087 194.163 62.3598 191.306 62.6001C184.264 62.6001 179.342 54.1008 179.342 41.9284C179.342 30.7223 183.009 23.7669 188.7 23.7669C195.647 23.7669 199.023 28.791 199.023 39.2233V59.3161ZM210.119 0H207.802L192.173 5.89338L192.751 7.53598C193.525 7.24883 194.339 7.08561 195.163 7.05233C198.154 7.05233 199.021 8.89106 199.021 15.4564V23.8627C196.137 21.2912 192.367 19.9403 188.506 20.095C176.736 20.095 167.475 31.4951 167.475 46.177C167.475 60.1864 174.808 69.9422 185.323 69.9422C190.338 69.9422 192.366 68.8836 199.021 63.1818C199.021 68.011 199.505 68.493 204.231 68.493H216.099V66.754C210.89 66.6581 210.118 65.2078 210.118 55.7423L210.119 0Z" fill="#ef6400"/>
                <path d="M96.5342 57.7731C95.4859 59.0016 94.2043 60.01 92.7637 60.7398C91.323 61.4697 89.7519 61.9065 88.1412 62.025C87.1556 62.0301 86.1793 61.8331 85.2728 61.4461C84.3662 61.0591 83.5487 60.4903 82.8706 59.775C82.1925 59.0596 81.6682 58.2128 81.3303 57.2868C80.9923 56.3609 80.8478 55.3755 80.9056 54.3915C80.9056 48.9829 83.896 46.3719 96.5342 40.8663V57.7731ZM96.5342 63.4737C96.5342 67.9178 97.1109 68.4967 101.743 68.4967H112.453V66.7594C108.4 66.663 107.629 65.0188 107.629 56.7139V35.6521C107.629 23.8659 103.576 20.0977 91.1317 20.0977C80.1328 20.0977 71.9321 25.2165 71.9321 32.2706C71.8936 32.957 71.9987 33.6439 72.2407 34.2874C72.4828 34.931 72.8564 35.5169 73.3377 36.0078C73.819 36.4988 74.3975 36.8839 75.0361 37.1386C75.6747 37.3932 76.3594 37.5119 77.0465 37.487C77.7003 37.5289 78.3556 37.4342 78.9707 37.2087C79.5858 36.9833 80.1472 36.6322 80.619 36.1777C81.0909 35.7232 81.4628 35.1754 81.7111 34.5691C81.9594 33.9629 82.0787 33.3116 82.0612 32.6567V31.208C81.9897 30.6964 81.9577 30.18 81.9654 29.6635C81.9151 28.759 82.0644 27.8544 82.4026 27.014C82.7408 26.1736 83.2597 25.4179 83.9226 24.8004C84.5854 24.1828 85.3759 23.7186 86.2381 23.4406C87.1003 23.1626 88.0131 23.0777 88.9118 23.1917C94.4107 23.1917 96.5342 26.283 96.5342 34.1093V37.4892C75.8876 45.1227 70.0025 49.466 70.0025 57.5842C69.9195 59.1637 70.1563 60.7437 70.6987 62.2295C71.2412 63.7153 72.078 65.0762 73.1592 66.2307C74.2404 67.3852 75.5436 68.3095 76.9906 68.9481C78.4377 69.5867 79.9988 69.9265 81.5803 69.9471C85.8256 69.9471 89.1063 68.2081 94.7985 62.8953C95.8572 61.9286 95.9541 61.8328 96.5342 61.3502V63.4737Z" fill="#ef6400"/>
                <path d="M49.295 35.5525V57.4824C49.295 64.7258 47.9455 66.2731 41.1907 66.4654V68.4946H69.5516V66.4654C62.6057 66.1767 61.449 64.7264 61.449 56.032V11.4012C61.449 4.34718 62.8977 2.41597 68.2021 2.12623L69.5516 2.02984V0.00111589H41.1907V2.02984C48.0441 2.32013 49.295 3.67299 49.295 10.3386V31.3001H20.2583V10.8195C20.2583 3.8641 21.9939 1.93289 28.3609 2.02873V0H0V2.02873C6.17476 1.93289 8.10431 4.058 8.10431 10.8195V56.0303C8.10431 64.8228 6.94758 66.2715 0 66.4637V68.493H28.3609V66.4637C21.6078 66.6576 20.2583 65.1125 20.2583 57.2885V35.5525H49.295Z" fill="#ef6400"/>
              </svg>
            </a>
          </div>

          {/* RIGHT SECTION - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-2">
            {/* Profile Link - Disabled */}
            <a 
              href="/login" 
              className="flex items-center justify-center min-w-[44px] min-h-[44px] hover:bg-slate-100 rounded-lg transition-colors duration-200 md:gap-2 md:px-2"
              onClick={(e) => e.preventDefault()}
              aria-label="Anmelden"
            >
              <User size={24} className="text-gray-700" />
              <span className="text-gray-700 font-medium hidden md:inline text-base">Anmelden</span>
            </a>
            
            {/* Abo Button - Disabled */}
            <button 
              className="text-white px-3 py-2 md:px-4 rounded font-medium hover:opacity-90 transition-colors duration-200 text-sm md:text-base min-h-[44px]"
              onClick={() => {}}
              style={{ 
                backgroundColor: '#ef6400'
              }}
            >
              Abo
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Disabled */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] md:hidden">
          <div className="fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menü</h2>
                <button 
                  onClick={() => {}}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-100 rounded-lg"
                  aria-label="Menü schließen"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="space-y-4">
                <a href="#" onClick={(e) => e.preventDefault()} className="block py-3 text-base font-medium text-gray-900 hover:text-orange-600 border-b border-gray-100">Nachrichten</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="block py-3 text-base font-medium text-gray-900 hover:text-orange-600 border-b border-gray-100">Unternehmen</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="block py-3 text-base font-medium text-gray-900 hover:text-orange-600 border-b border-gray-100">Finanzen</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="block py-3 text-base font-medium text-gray-900 hover:text-orange-600 border-b border-gray-100">Politik</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="block py-3 text-base font-medium text-gray-900 hover:text-orange-600 border-b border-gray-100">Technik</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="block py-3 text-base font-medium text-gray-900 hover:text-orange-600 border-b border-gray-100">Meinung</a>
                
                {/* Mobile-only navigation items */}
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <button onClick={() => {}} className="flex items-center gap-3 py-3 text-base font-medium text-gray-900 hover:text-orange-600 w-full text-left">
                    <Search size={20} />
                    <span>Suchen</span>
                  </button>
                  <a href="/login" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 py-3 text-base font-medium text-gray-900 hover:text-orange-600">
                    <User size={20} />
                    <span>Anmelden</span>
                  </a>
                  <button 
                    className="w-full text-white px-4 py-3 rounded font-medium hover:opacity-90 transition-colors duration-200 text-base"
                    onClick={() => {}}
                    style={{ backgroundColor: '#ef6400' }}
                  >
                    Abo
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HandelsblattHeaderH2;