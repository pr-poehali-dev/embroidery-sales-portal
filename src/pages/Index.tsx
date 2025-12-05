import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ContentSections from '@/components/ContentSections';
import Footer from '@/components/Footer';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [calculatorValues, setCalculatorValues] = useState({
    width: '',
    height: '',
    colors: '1',
    quantity: '1',
  });

  const products: Product[] = [
    {
      id: 1,
      name: 'Логотип на одежде',
      description: 'Корпоративная вышивка логотипа на текстиле',
      price: 350,
      image: 'https://cdn.poehali.dev/projects/1f589a4f-afd4-4898-b03c-7041509eb159/files/84a33751-d74d-4737-a902-03dc27044b27.jpg',
      category: 'Корпоративное'
    },
    {
      id: 2,
      name: 'Именная вышивка',
      description: 'Персонализация одежды и аксессуаров',
      price: 250,
      image: 'https://cdn.poehali.dev/projects/1f589a4f-afd4-4898-b03c-7041509eb159/files/1b655c13-a5bd-4e38-a3bf-499efb4eb8f3.jpg',
      category: 'Персональное'
    },
    {
      id: 3,
      name: 'Шевроны и патчи',
      description: 'Изготовление шевронов любой сложности',
      price: 180,
      image: 'https://cdn.poehali.dev/projects/1f589a4f-afd4-4898-b03c-7041509eb159/files/30268d71-fddb-4bdc-988d-b7316ef9f8e0.jpg',
      category: 'Патчи'
    },
    {
      id: 4,
      name: 'Вышивка на спецодежде',
      description: 'Брендирование спецодежды для компаний',
      price: 420,
      image: 'https://cdn.poehali.dev/projects/1f589a4f-afd4-4898-b03c-7041509eb159/files/84a33751-d74d-4737-a902-03dc27044b27.jpg',
      category: 'Корпоративное'
    },
    {
      id: 5,
      name: 'Декоративная вышивка',
      description: 'Художественные композиции на текстиле',
      price: 650,
      image: 'https://cdn.poehali.dev/projects/1f589a4f-afd4-4898-b03c-7041509eb159/files/1b655c13-a5bd-4e38-a3bf-499efb4eb8f3.jpg',
      category: 'Декор'
    },
    {
      id: 6,
      name: 'Промо-продукция',
      description: 'Вышивка на сувенирной продукции',
      price: 300,
      image: 'https://cdn.poehali.dev/projects/1f589a4f-afd4-4898-b03c-7041509eb159/files/30268d71-fddb-4bdc-988d-b7316ef9f8e0.jpg',
      category: 'Промо'
    }
  ];

  const portfolioItems = [
    { image: 'https://cdn.poehali.dev/projects/1f589a4f-afd4-4898-b03c-7041509eb159/files/84a33751-d74d-4737-a902-03dc27044b27.jpg', title: 'Корпоративные логотипы' },
    { image: 'https://cdn.poehali.dev/projects/1f589a4f-afd4-4898-b03c-7041509eb159/files/1b655c13-a5bd-4e38-a3bf-499efb4eb8f3.jpg', title: 'Художественная вышивка' },
    { image: 'https://cdn.poehali.dev/projects/1f589a4f-afd4-4898-b03c-7041509eb159/files/30268d71-fddb-4bdc-988d-b7316ef9f8e0.jpg', title: 'Патчи и шевроны' },
  ];

  const services = [
    { icon: 'Sparkles', title: 'Машинная вышивка', description: 'Высококачественная вышивка на современном оборудовании' },
    { icon: 'Palette', title: 'Дизайн макетов', description: 'Создание уникальных дизайнов для вышивки' },
    { icon: 'Package', title: 'Оптовые заказы', description: 'Специальные условия для крупных партий' },
    { icon: 'Zap', title: 'Срочные заказы', description: 'Выполнение заказов в кратчайшие сроки' },
  ];

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success('Товар добавлен в корзину');
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success('Товар удален из корзины');
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculatePrice = () => {
    const width = parseFloat(calculatorValues.width) || 0;
    const height = parseFloat(calculatorValues.height) || 0;
    const colors = parseInt(calculatorValues.colors) || 1;
    const quantity = parseInt(calculatorValues.quantity) || 1;

    const area = (width * height) / 100;
    const basePrice = area * 50;
    const colorMultiplier = 1 + (colors - 1) * 0.2;
    const quantityDiscount = quantity > 10 ? 0.85 : quantity > 5 ? 0.9 : 1;

    return Math.round(basePrice * colorMultiplier * quantityDiscount * quantity);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckout = () => {
    toast.success('Спасибо за заказ! Мы свяжемся с вами в ближайшее время');
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-white">
      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        calculateTotal={calculateTotal}
        onCheckout={handleCheckout}
      />
      
      <HeroSection scrollToSection={scrollToSection} />
      
      <ContentSections
        products={products}
        services={services}
        portfolioItems={portfolioItems}
        addToCart={addToCart}
        calculatorValues={calculatorValues}
        setCalculatorValues={setCalculatorValues}
        calculatePrice={calculatePrice}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
