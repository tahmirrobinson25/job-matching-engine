import { useEffect } from 'react';
import type { Job } from '../types';

type JobDetailModalProps = {
    job: Job | null;
    onClose: () => void;
}

function formatSalary(value: number) {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function JobDetailModal({job, onClose} :JobDetailModalProps) {
    useEffect(() => {
        if (!job) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [job, onClose]);
    if (!job) return null;
    const scoreLabel = 
    typeof job.score === 'number' && Number.isNaN(job.score) 
    ? job.score.toFixed(1): '-';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-hidden={false}
        >
            <button type="button"
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[1px]"
        aria-label="Close job details"
        onClick={onClose}
            />
                <div role="dialog" aria-modal="true" aria-labelledby="job-modal-title"
                className="relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
                >
                    <div className="flex items-start justify-between gap-3 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800"
                    >
                        <div className="min-w-0 text-left">
                        <h2 id="job-modal-title"
                        className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
                        >
                            {job.title}
                        </h2>
                        <p className="mt-1 text-sm font-medium text-violet-700 dark:text-violet-300">

                        </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-2">
                            <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold tabular-nums text-violet-800 dark:bg-violet-950/80 dark:text-violet-200">
                                Score {job.score}
                            </span>
                            <button
                            type="button" 
                            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
                            onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                    <div>
                        <dl className="grid gap-3 sm:grid-cols-2">
                            <div>
                                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    Location
                                </dt>
                                <dd className="mt-0.5">{job.location || '-'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    Type
                                </dt>
                                <dd className="mt-0.5">
                                    {job.type || '-'}
                                </dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                Salary
                                </dt>  
                                    <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-100">
                                        {formatSalary(job.salary)}
                                    </dd>
                                
                            </div>
                        </dl>
                        <div>
                            <h3 className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                Description
                            </h3>
                            <p className="mt-2 whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
                                {job.description}
                            </p>
                        </div>
                    </div>
                </div>
        </div>
    );
}