/**
 * Płynna funkcja scrollowania z lepszą kontrolą nad animacją
 * @param targetPosition - pozycja docelowa (px od góry strony)
 * @param duration - czas trwania animacji w milisekundach (domyślnie 1500ms)
 * @param offset - dodatkowy offset w pikselach (domyślnie 140px dla sticky header)
 * @param easingFunction - funkcja easing ('ease-out-cubic' | 'ease-in-out-cubic' | 'ease-out-quart')
 */
export function smoothScrollTo(
  targetPosition: number, 
  duration: number = 1500, 
  offset: number = 140,
  easingFunction: 'ease-out-cubic' | 'ease-in-out-cubic' | 'ease-out-quart' = 'ease-out-cubic'
) {
  const startPosition = window.pageYOffset;
  const finalPosition = Math.max(0, targetPosition - offset); // Nie scrolluj poniżej 0
  const distance = finalPosition - startPosition;
  let startTime: number | null = null;

  // Różne funkcje easing dla różnych efektów
  function getEasingFunction(type: string) {
    switch (type) {
      case 'ease-in-out-cubic':
        return (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      case 'ease-out-quart':
        return (t: number) => 1 - Math.pow(1 - t, 4);
      default: // ease-out-cubic
        return (t: number) => 1 - Math.pow(1 - t, 3);
    }
  }

  const easing = getEasingFunction(easingFunction);

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const run = easing(progress) * distance;
    
    window.scrollTo(0, startPosition + run);
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, finalPosition);
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Pomocnicza funkcja do scrollowania do elementu po ID
 * @param elementId - ID elementu do którego chcemy scrollować
 * @param duration - czas trwania animacji w milisekundach
 * @param offset - dodatkowy offset w pikselach
 * @param easingFunction - funkcja easing dla animacji
 */
export function scrollToElement(
  elementId: string, 
  duration: number = 1200, 
  offset: number = 140,
  easingFunction: 'ease-out-cubic' | 'ease-in-out-cubic' | 'ease-out-quart' = 'ease-out-cubic'
) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop;
    smoothScrollTo(elementPosition, duration, offset, easingFunction);
  }
}