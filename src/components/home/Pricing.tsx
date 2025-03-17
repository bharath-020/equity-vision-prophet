
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PricingFeature {
  included: boolean;
  text: string;
}

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  popular?: boolean;
}

const PricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: 0,
    period: 'Forever',
    description: 'Essential stock analysis tools for beginners',
    features: [
      { included: true, text: 'Basic stock data' },
      { included: true, text: 'Limited historical charts' },
      { included: true, text: 'Market news feed' },
      { included: false, text: 'Advanced analytics' },
      { included: false, text: 'AI predictions' },
      { included: false, text: 'Portfolio tracking' },
      { included: false, text: 'Email alerts' },
    ],
    buttonText: 'Get Started',
  },
  {
    name: 'Pro',
    price: 29.99,
    period: '/month',
    description: 'Advanced features for serious investors',
    features: [
      { included: true, text: 'Full stock data access' },
      { included: true, text: 'Complete historical charts' },
      { included: true, text: 'Premium market news' },
      { included: true, text: 'Advanced analytics' },
      { included: true, text: 'Basic AI predictions' },
      { included: true, text: 'Portfolio tracking' },
      { included: false, text: 'Email alerts' },
    ],
    buttonText: 'Go Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99.99,
    period: '/month',
    description: 'Comprehensive solution for professional traders',
    features: [
      { included: true, text: 'Full stock data access' },
      { included: true, text: 'Complete historical charts' },
      { included: true, text: 'Premium market news' },
      { included: true, text: 'Expert analytics' },
      { included: true, text: 'Advanced AI predictions' },
      { included: true, text: 'Portfolio tracking' },
      { included: true, text: 'Custom email alerts' },
    ],
    buttonText: 'Contact Sales',
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePricingAction = (plan: PricingPlan) => {
    if (plan.price === 0) {
      navigate('/sign-up');
    } else if (plan.name === 'Enterprise') {
      toast({
        title: "Contact request sent",
        description: "Our sales team will contact you shortly.",
      });
    } else {
      navigate('/sign-in');
      toast({
        title: "Subscription required",
        description: "Please sign in or create an account to subscribe.",
      });
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Select the perfect plan to enhance your stock market analysis capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PricingPlans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'border-primary shadow-md dark:bg-gray-800/70' 
                  : 'dark:bg-gray-800/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                </div>
              )}
              <CardHeader className="text-center pb-0">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 h-12">{plan.description}</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 ${
                        feature.included 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                      }`}>
                        <Check className="h-3 w-3" />
                      </div>
                      <span className={feature.included ? '' : 'text-gray-400 line-through'}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handlePricingAction(plan)}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
