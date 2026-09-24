import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

interface CallToActionProps {
  title?: string;
  description?: string;
}

/**
 * Closing band shared by every page: one heading, one line of reassurance and
 * the single action the practice wants a patient to take.
 */
export function CallToAction({
  title = 'Ready to arrange your appointment?',
  description = 'Our friendly team is here to help you with booking and any questions.',
}: CallToActionProps) {
  return (
    <section className="border-y border-frost-200 bg-frost-100" aria-labelledby="cta-heading">
      <Container size="wide" className="py-8 sm:py-9">
        <Reveal className="flex flex-col items-center gap-5 text-center lg:flex-row lg:gap-8 lg:text-left">
          <Icon name="heart-pulse" size={40} strokeWidth={1.4} className="shrink-0 text-crimson-500" />

          <span aria-hidden="true" className="hidden h-14 w-px shrink-0 bg-ink-200 lg:block" />

          <div className="flex-1">
            <h2 id="cta-heading" className="text-[1.375rem] leading-tight font-bold text-ink-900">
              {title}
            </h2>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-500">{description}</p>
          </div>

          <Button href="/make-an-appointment" size="lg" className="shrink-0">
            <Icon name="calendar" size={18} />
            Book an Appointment
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
