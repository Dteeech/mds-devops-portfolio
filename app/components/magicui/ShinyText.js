'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import './ShinyText.css';

// Constants
const PROGRESS_MAX = 100;
const PROGRESS_MIN = 0;
const BACKGROUND_POSITION_MAX = 150;
const BACKGROUND_POSITION_MULTIPLIER = 2;
const MILLISECONDS_PER_SECOND = 1000;

const ShinyText = ({
  text,
  disabled,
  speed,
  className,
  color,
  shineColor,
  spread,
  yoyo,
  pauseOnHover,
  direction,
  delay
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(PROGRESS_MIN);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const directionRef = useRef(direction === 'left' ? 1 : -1);

  const animationDuration = useMemo(() => speed * MILLISECONDS_PER_SECOND, [speed]);
  const delayDuration = useMemo(() => delay * MILLISECONDS_PER_SECOND, [delay]);

  const calculateYoyoProgress = useCallback((cycleTime, cycleDuration, fullCycle) => {
    const directionMultiplier = directionRef.current;

    if (cycleTime < animationDuration) {
      // Forward animation: 0 -> 100
      const progressValue = (cycleTime / animationDuration) * PROGRESS_MAX;
      return directionMultiplier === 1 ? progressValue : PROGRESS_MAX - progressValue;
    }

    if (cycleTime < cycleDuration) {
      // Delay at end
      return directionMultiplier === 1 ? PROGRESS_MAX : PROGRESS_MIN;
    }

    if (cycleTime < cycleDuration + animationDuration) {
      // Reverse animation: 100 -> 0
      const reverseTime = cycleTime - cycleDuration;
      const progressValue = PROGRESS_MAX - (reverseTime / animationDuration) * PROGRESS_MAX;
      return directionMultiplier === 1 ? progressValue : PROGRESS_MAX - progressValue;
    }

    // Delay at start
    return directionMultiplier === 1 ? PROGRESS_MIN : PROGRESS_MAX;
  }, [animationDuration]);

  const calculateLinearProgress = useCallback((cycleTime, cycleDuration) => {
    const directionMultiplier = directionRef.current;

    if (cycleTime < animationDuration) {
      // Animation phase: 0 -> 100
      const progressValue = (cycleTime / animationDuration) * PROGRESS_MAX;
      return directionMultiplier === 1 ? progressValue : PROGRESS_MAX - progressValue;
    }

    // Delay phase - hold at end (shine off-screen)
    return directionMultiplier === 1 ? PROGRESS_MAX : PROGRESS_MIN;
  }, [animationDuration]);

  useAnimationFrame(time => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    const cycleDuration = animationDuration + delayDuration;

    if (yoyo) {
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;
      const progressValue = calculateYoyoProgress(cycleTime, cycleDuration, fullCycle);
      progress.set(progressValue);
    } else {
      const cycleTime = elapsedRef.current % cycleDuration;
      const progressValue = calculateLinearProgress(cycleTime, cycleDuration);
      progress.set(progressValue);
    }
  });

  useEffect(() => {
    directionRef.current = direction === 'left' ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(PROGRESS_MIN);
  }, [direction, progress]);

  const backgroundPosition = useTransform(
    progress,
    p => `${BACKGROUND_POSITION_MAX - p * BACKGROUND_POSITION_MULTIPLIER}% center`
  );

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }), [spread, color, shineColor]);

  return (
    <motion.span
      className={`shiny-text ${className}`}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
};

ShinyText.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  speed: PropTypes.number,
  className: PropTypes.string,
  color: PropTypes.string,
  shineColor: PropTypes.string,
  spread: PropTypes.number,
  yoyo: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  direction: PropTypes.oneOf(['left', 'right']),
  delay: PropTypes.number
};

ShinyText.defaultProps = {
  disabled: false,
  speed: 2,
  className: '',
  color: '#b5b5b5',
  shineColor: '#ffffff',
  spread: 120,
  yoyo: false,
  pauseOnHover: false,
  direction: 'left',
  delay: 0
};

export default ShinyText;
