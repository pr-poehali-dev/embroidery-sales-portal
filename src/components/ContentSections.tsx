import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

interface ContentSectionsProps {
  products: Product[];
  services: Array<{ icon: string; title: string; description: string }>;
  portfolioItems: Array<{ image: string; title: string }>;
  addToCart: (product: Product) => void;
  calculatorValues: {
    width: string;
    height: string;
    colors: string;
    quantity: string;
  };
  setCalculatorValues: (values: any) => void;
  calculatePrice: () => number;
}

const ContentSections = ({
  products,
  services,
  portfolioItems,
  addToCart,
  calculatorValues,
  setCalculatorValues,
  calculatePrice
}: ContentSectionsProps) => {
  return (
    <>
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
    </>
  );
};

export default ContentSections;
