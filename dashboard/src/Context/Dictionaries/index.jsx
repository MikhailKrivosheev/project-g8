/* eslint-disable camelcase */
import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';

export const DictionaryContext = createContext();

export const DictionaryContextProvider = ({ children }) => {
  const [dictionary, setDictionary] = useState(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const response = await Api.get(Api.routes.dictionary(), {
        name: [
          'account_role',
          'account_status',
          'season_contest_stage_code',
          'season_payment_system',
          'season_popup_form',
          'work_status',
          'album_type',
          'judge_type',
          'voting_log_stage_code',
          'nomination_work_stage',
          'export_work_sort_fields',
          'export_work_sort_direction',
          'contest_rule_fields',
          'contest_type',
          'cost_widget_type',
        ],
      });
      setDictionary(response?.results);
    };
    fetchDictionary();
  }, []);

  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
};
