import { Home } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@root/components/ui';
import { RoutesPath } from '@root/router/routes';

const notFoundImage = '/pinky-flower/assets/images/404-image.webp';

const NotFoundPage: FC = () => {
    return (
        <section className="flex min-h-[60vh] flex-col items-center justify-center gap-8">
            <article className="flex flex-col items-center gap-6 text-center">
                <figure className="relative" aria-label="Иллюстрация ошибки 404">
                    <img
                        src={notFoundImage}
                        alt=""
                        role="presentation"
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full max-w-sm rounded-2xl object-cover shadow-xl ring-2 ring-primary/20 sm:max-w-md"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className =
                                    'flex h-64 w-64 items-center justify-center rounded-full bg-primary/10 text-6xl sm:h-80 sm:w-80 sm:text-8xl';
                                fallback.setAttribute('aria-label', 'Ошибка 404');
                                fallback.textContent = '404';
                                parent.replaceChild(fallback, target);
                            }
                        }}
                    />
                </figure>

                <header className="space-y-3">
                    <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
                        Страница не найдена
                    </h1>
                    <p className="mx-auto max-w-md text-base text-muted-foreground sm:text-lg">
                        К сожалению, страница, которую вы ищете, не существует или была перемещена.
                    </p>
                </header>

                <nav aria-label="Навигация по странице ошибки">
                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                        <Button asChild size="lg" className="gap-2">
                            <Link to={RoutesPath.Root}>
                                <Home className="h-4 w-4" aria-hidden="true" />
                                На главную
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                            Назад
                        </Button>
                    </div>
                </nav>
            </article>
        </section>
    );
};

export default NotFoundPage;
