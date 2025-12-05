import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-white">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Shirt" className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Вышивка Pro
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {['home', 'catalog', 'gallery', 'services', 'about', 'portfolio', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'services' && 'Услуги'}
                  {section === 'about' && 'О нас'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Icon name="ShoppingCart" className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {cartItems.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cartItems.length === 0 ? 'Корзина пуста' : `${cartItems.length} товаров`}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-8 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.price} ₽</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                            <Icon name="Minus" className="w-4 h-4" />
                          </Button>
                          <span className="font-medium">{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                            <Icon name="Plus" className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="ml-auto text-red-500"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {cartItems.length > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Итого:</span>
                        <span className="text-primary">{calculateTotal()} ₽</span>
                      </div>
                      <Button className="w-full" size="lg" onClick={() => {
                        toast.success('Спасибо за заказ! Мы свяжемся с вами в ближайшее время');
                        setCartItems([]);
                      }}>
                        Оформить заказ
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="home" className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="mb-4">Профессиональная вышивка</Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Машинная вышивка
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  любой сложности
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Создаём уникальные вышитые изделия для бизнеса и частных лиц. Высокое качество, быстрые сроки, доступные цены.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection('catalog')} className="group">
                  Смотреть каталог
                  <Icon name="ArrowRight" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')}>
                  Связаться с нами
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src="https://cdn.poehali.dev/projects/1f589a4f-afd4-4898-b03c-7041509eb159/files/1b655c13-a5bd-4e38-a3bf-499efb4eb8f3.jpg"
                alt="Машинная вышивка"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Award" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">500+</p>
                    <p className="text-sm text-gray-600">Довольных клиентов</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Наши услуги</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что мы предлагаем</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Полный спектр услуг машинной вышивки для любых задач
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={service.icon as any} className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Каталог</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Популярные услуги</h2>
            <p className="text-xl text-gray-600">Выберите тип вышивки из нашего каталога</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4">{product.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    <Button onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" className="w-5 h-5 mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Калькулятор</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Рассчитайте стоимость</h2>
            <p className="text-xl text-gray-600">Узнайте примерную цену вашего заказа</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Калькулятор стоимости вышивки</CardTitle>
              <CardDescription>Введите параметры вашего заказа</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Ширина (мм)</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="100"
                    value={calculatorValues.width}
                    onChange={(e) => setCalculatorValues({ ...calculatorValues, width: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Высота (мм)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="100"
                    value={calculatorValues.height}
                    onChange={(e) => setCalculatorValues({ ...calculatorValues, height: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="colors">Количество цветов</Label>
                <Input
                  id="colors"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={calculatorValues.colors}
                  onChange={(e) => setCalculatorValues({ ...calculatorValues, colors: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="quantity">Количество изделий</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={calculatorValues.quantity}
                  onChange={(e) => setCalculatorValues({ ...calculatorValues, quantity: e.target.value })}
                />
              </div>
              <Separator />
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Примерная стоимость:</span>
                <span className="text-primary">{calculatePrice()} ₽</span>
              </div>
              <p className="text-sm text-gray-500 text-center">
                * Точная стоимость рассчитывается индивидуально после согласования макета
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Портфолио</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши работы</h2>
            <p className="text-xl text-gray-600">Примеры выполненных проектов</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">О нас</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Кто мы такие</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Мы — команда профессионалов с 10-летним опытом в области машинной вышивки. 
              Используем современное оборудование и качественные материалы для создания 
              безупречных изделий. Работаем с частными клиентами и крупными компаниями, 
              выполняя заказы любой сложности.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">10+</p>
                <p className="text-gray-600">Лет опыта</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-gray-600">Клиентов</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">5000+</p>
                <p className="text-gray-600">Проектов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Контакты</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-xl text-gray-600">Оставьте заявку и мы свяжемся с вами</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время');
                  e.currentTarget.reset();
                }}>
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" placeholder="Иван Иванов" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="ivan@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (900) 123-45-67" required />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea id="message" placeholder="Опишите ваш заказ..." rows={4} required />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Отправить заявку
                  </Button>
                </form>

                <Separator className="my-8" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" className="w-5 h-5 text-primary" />
                    <span>+7 (900) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" className="w-5 h-5 text-primary" />
                    <span>info@embroidery-pro.ru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" className="w-5 h-5 text-primary" />
                    <span>Москва, ул. Примерная, д. 123</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Index;
