import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
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
  );
};

export default HeroSection;
