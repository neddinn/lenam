'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface RemediationViewProps {
  onClose: () => void;
}

export function RemediationView({ onClose }: RemediationViewProps) {
  const [quizAnswered, setQuizAnswered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className='w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-paper shadow-lg border border-neutral-200 overflow-hidden flex flex-col md:flex-row h-[80vh]'
    >
      {/* Left Column: Context / Navigation */}
      <div className='md:w-64 bg-neutral-50 border-r border-neutral-100 flex flex-col p-6 shrink-0'>
        <Button
          variant='ghost'
          size='sm'
          onClick={onClose}
          className='self-start -ml-2 text-neutral-500 mb-8'
        >
          <ArrowLeft size={16} className='mr-2' /> Back to Drill
        </Button>

        <div className='space-y-6'>
          <div>
            <h4 className='text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2'>
              Topic
            </h4>
            <p className='text-sm font-medium text-neutral-900'>
              React Rendering & Effects
            </p>
          </div>

          <div>
            <h4 className='text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2'>
              The Gap
            </h4>
            <div className='p-3 bg-white rounded border border-amber-200/50 shadow-sm'>
              <p className='text-xs text-amber-900 leading-relaxed'>
                You confused <strong>useEffect</strong> with external
                synchronization. Remember: Effects are an escape hatch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: The Lesson */}
      <div className='flex-1 overflow-y-auto p-8 md:p-12 relative'>
        <div className='max-w-prose mx-auto space-y-8'>
          <header className='space-y-4 pb-8 border-b border-neutral-100'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider'>
                Concept
              </span>
              <span className='text-neutral-400 text-xs'>
                Updated 2 days ago
              </span>
            </div>
            <h1 className='text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight text-balance-header'>
              Synchronizing with External Systems
            </h1>
          </header>
          <div className='prose prose-neutral prose-lg text-neutral-600 leading-relaxed'>
            <p>
              React components are typically pure functions of their props and
              state. However, sometimes you need to escape React&apos;s paradigm
              to interface with systems outside of React&apos;s control, such as
              a jQuery plugin, the window object, or a WebSocket connection.
            </p>

            <div className='my-6 p-6 bg-amber-50 rounded-xl border-l-4 border-amber-400 relative'>
              <h3 className='text-amber-900 font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2'>
                Key Insight
              </h3>
              <p className='text-amber-900/80 m-0'>
                <code className='bg-amber-100/50 text-amber-900 px-1 rounded font-semibold'>
                  useEffect
                </code>{' '}
                is specifically designed for this synchronization. It runs{' '}
                <em>after</em> render, allowing you to sync the DOM or external
                stores with the latest React state.
              </p>
            </div>

            <p>
              Unlike <code>useReducer</code> (which handles complex state logic)
              or <code>useContext</code> (which handles prop drilling),{' '}
              <strong>useEffect</strong> binds the component lifecycle to the
              outside world.
            </p>

            <h3>When not to use it</h3>
            <p>
              If you are just calculating state based on other state, you
              don&apos;t need an Effect. You can just calculate it during
              render. Effects are strictly for side effects.
            </p>
          </div>
          {/* Embedded Micro-Quiz */}
          <div className='mt-12 pt-8 border-t border-dashed border-neutral-200'>
            <h3 className='font-semibold text-neutral-900 mb-4 flex items-center gap-2'>
              <CheckCircle2 size={18} className='text-indigo-600' />
              Quick Check
            </h3>

            <div className='bg-neutral-50 rounded-xl p-6 space-y-4 transition-colors hover:bg-neutral-100/50'>
              <p className='font-medium text-neutral-800'>
                True or False: You should use useEffect to filter a list of
                items based on a search query prop.
              </p>

              {!quizAnswered ? (
                <div className='flex gap-3'>
                  <Button
                    onClick={() => setQuizAnswered(true)}
                    variant='secondary'
                    className='bg-white'
                  >
                    True
                  </Button>
                  <Button
                    onClick={() => setQuizAnswered(true)}
                    variant='secondary'
                    className='bg-white'
                  >
                    False
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className='bg-green-100/50 text-green-800 p-4 rounded-lg text-sm border border-green-200'
                >
                  <strong>Correct.</strong> You should just filter the array
                  during rendering. No Effect needed.
                </motion.div>
              )}
            </div>
          </div>
          <div className='h-20' /> {/* Spacer */}
        </div>

        {/* Sticky Return Action */}
        <div className='absolute bottom-6 right-8'>
          {quizAnswered && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Button
                onClick={onClose}
                variant='primary'
                size='lg'
                className='shadow-2xl shadow-neutral-900/20'
              >
                Resume Drill <ArrowRight size={18} className='ml-2' />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
