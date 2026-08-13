import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="font-medium min-w-[3rem]"
        >
            {language === 'fr' ? '🇺🇸 EN' : '🇫🇷 FR'}
        </Button>
    );
};
