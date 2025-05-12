import Api from 'Api';
import React, { useEffect, useState } from 'react';

export default function AccountBackground() {
  const [banner, setBanner] = useState();

  useEffect(() => {
    const fetchBackgroundBanner = async () => {
      const { results } = await Api.get(Api.routes.api.settings());

      setBanner(results?.lk?.banner);
    };

    fetchBackgroundBanner();
  }, []);

  if (!banner) return null;

  return <img className="account__background" src={banner} alt="" />;
}
