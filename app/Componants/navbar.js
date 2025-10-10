'use client';
import { useTranslation } from '../contexts/TranslationContext';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CartSidebar from './CartSidebar';
import SearchComponent from './SearchComponant';
import Sidebar from './sidebar';
import NavbarNotifications from './NotificationsBell';

export default function NavbarWithLinks({ onSelectCategory }) {
  const { t, lang, setLang } = useTranslation();
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const userId = "1";
  // ✅ تعديل هنا
  const handleCategorySelect = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId); // نبلغ الصفحة
    }
    setSidebarOpen(false); // نقفل السايدبار بعد الاختيار
  };

  return (
    <>
      <header className="w-full bg-black shadow py-4">
        <div className="navbar-container container mx-auto px-4 flex items-center justify-between">
          <div className="navbar-left flex items-center gap-4 order-3 sm:order-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-amber-400 transition-colors duration-200 cursor-pointer lg:hidden"
            >
              <FaBars size={20} />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="text-white hover:text-amber-400 transition-colors duration-200 cursor-pointer"
            >
              <FaShoppingCart size={20} />
            </button>
          </div>

          <div className="navbar-center order-1 sm:order-2 flex items-center gap-4">
            <Link href="/" className="relative w-24 sm:w-32 md:w-40 h-10 sm:h-12 md:h-14 block">
              <Image
                src="https://static-assets.keepersport.net/dist/82d4dde2fe42e8e4fbfc.svg"
                alt="LOGO"
                fill
                sizes="(max-width: 640px) 6rem, (max-width: 768px) 8rem, 10rem"
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <div className="navbar-right order-2 flex items-center gap-4">
            <Link href="/login" className="text-white hover:text-red-600 transition-colors duration-200">
              <FaUser size={20} />
            </Link>

            <button
              className="text-white hover:text-amber-400 transition-colors duration-200 cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FaSearch size={20} />
            </button>
            <NavbarNotifications userId={userId} />
            {searchOpen && <SearchComponent onClose={() => setSearchOpen(false)} />}

            <select
              onChange={(e) => setLang(e.target.value)}
              value={lang}
              className="bg-black text-white border border-gray-500 px-2 py-1 rounded text-sm"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </header>

      <nav id="main-links" className="flex justify-around bg-black shadow py-3 text-sm sm:text-[14px] lg:text-lg">
        <ul className="flex gap-6 md:gap-12 text-white font-bold">
          <li><Link href="/GoalkeeperGloves" className="hover:border-b-2 pb-1 border-white">{t('Goalkeeper Gloves')}</Link></li>
          <li><Link href="/FootballBoots" className="hover:border-b-2 pb-1 border-white">{t('Football Boots')}</Link></li>
          <li><Link href="/Goalkeeper apparel" className="hover:border-b-2 pb-1 border-white">{t('Goalkeeper Apparel')}</Link></li>
          <li><Link href="/Goalkeeper equipment" className="hover:border-b-2 pb-1 border-white">{t('Goalkeeper Equipment')}</Link></li>
          <li><Link href="/Teamsport" className="hover:border-b-2 pb-1 border-white">{t('Teamsport')}</Link></li>
          <li><Link href="/Sale" className="hover:border-b-2 pb-1 border-white">{t('Sale')}</Link></li>
        </ul>
      </nav>

      {/* ✅ Sidebar Drawer */}
      <div className="lg:hidden">
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
