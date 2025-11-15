import { Home, RefreshCw } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@root/components/ui';
import { RoutesPath } from '@root/router/routes';

const errorImage = '/pinky-flower/assets/images/error-boundary.webp';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    message?: string;
}

class ErrorBoundaryComponent extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, message: error.message };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className="flex min-h-screen flex-col items-center justify-center py-12">
                    <article className="flex h-full w-full max-w-4xl flex-col items-center justify-between gap-6 text-center">
                        <figure className="relative" aria-label="Иллюстрация ошибки">
                            <img
                                src={errorImage}
                                alt=""
                                role="presentation"
                                loading="lazy"
                                decoding="async"
                                className="h-[50vh] w-full max-w-sm rounded-2xl object-cover shadow-xl ring-2 ring-primary/20 sm:max-w-md"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                        const fallback = document.createElement('div');
                                        fallback.className =
                                            'flex h-64 w-64 items-center justify-center rounded-full bg-primary/10 text-6xl sm:h-80 sm:w-80 sm:text-8xl';
                                        fallback.setAttribute('aria-label', 'Ошибка');
                                        fallback.textContent = '⚠️';
                                        parent.replaceChild(fallback, target);
                                    }
                                }}
                            />
                        </figure>

                        <header className="space-y-3">
                            <h1 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                                Что-то пошло не так...
                            </h1>
                            <p className="mx-auto max-w-md text-sm text-muted-foreground sm:text-base md:text-lg">
                                Пожалуйста, обновите страницу или попробуйте позже.
                            </p>
                        </header>

                        <nav aria-label="Навигация по странице ошибки">
                            <div className="flex flex-col items-center gap-4 sm:flex-row">
                                <Button asChild size="lg" className="gap-2 sm:h-11 sm:px-8">
                                    <Link to={RoutesPath.Root}>
                                        <Home className="h-4 w-4" aria-hidden="true" />
                                        На главную
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="gap-2 sm:h-11 sm:px-8"
                                    onClick={() => window.location.reload()}
                                >
                                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                                    Обновить страницу
                                </Button>
                            </div>
                        </nav>
                    </article>
                </section>
            );
        }

        return this.props.children;
    }
}

export const ErrorBoundary = ErrorBoundaryComponent;
