import { TTicket } from 'Pages/Price/types';
import { useEffect } from 'react';

const useScript = (data: TTicket) => {
  const scriptElements: HTMLScriptElement[] = [];

  useEffect(() => {
    return () => {
      scriptElements.forEach((script) => document.body.removeChild(script));
    };
  }, [data]);

  const initScript = () => {
    if (data) {
      data.forEach((ticket) => {
        const {
          widget_type: ticketType,
          timepad_event_id: timepadId,
          timepad_customized_id: timepadCustomizationId,
        } = ticket;

        if (ticketType === 'ticketscloud') {
          const tcScript = document.createElement('script');
          tcScript.src =
            'https://ticketscloud.com/static/scripts/widget/tcwidget.js';
          tcScript.async = true;
          document.body.appendChild(tcScript);
          scriptElements.push(tcScript);
        }

        if (ticketType === 'timepad') {
          const tpScript = document.createElement('script');
          tpScript.src = 'https://timepad.ru/js/tpwf/loader/min/loader.js';
          tpScript.async = true;
          tpScript.defer = true;
          tpScript.setAttribute(
            'data-timepad-customized',
            timepadCustomizationId
          );
          tpScript.setAttribute('data-timepad-widget-v2', 'event_register');

          const timepadScript = document.createTextNode(`
            (function () {
              return {
                event: { id: ${timepadId} },
                hidePreloading: true,
                display: 'popup',
                popup: { triggerSelector: '#timepad_twf_register_${timepadId}' },
              };
            })();
            `);

          tpScript.appendChild(timepadScript);
          document.body.appendChild(tpScript);
          scriptElements.push(tpScript);
        }
      });
    }
    return null;
  };

  return { initScript };
};

export default useScript;
