import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Icon name="Shirt" className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Вышивка Pro</span>
          </div>
          <p className="text-gray-400">© 2024 Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
