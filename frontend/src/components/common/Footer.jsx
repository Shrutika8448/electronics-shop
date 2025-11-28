const Footer = () => {
  return (
    <footer className="bg-offwhite-100/80 backdrop-blur-sm border-t border-offwhite-200/50 mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-10 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-center sm:text-left text-offwhite-600">
            © 2025 ElectroShop. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-primary-700 transition text-offwhite-700 font-medium">About</a>
            <a href="#" className="hover:text-primary-700 transition text-offwhite-700 font-medium">Contact</a>
            <a href="#" className="hover:text-primary-700 transition text-offwhite-700 font-medium">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
