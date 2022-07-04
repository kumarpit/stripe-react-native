import { useState, useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { fetchPublishableKey } from './helpers';
import PaymentCard from './components/PaymentCard';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';

const urlScheme = Constants.appOwnership === 'expo' ? Linking.createURL('/--/') : Linking.createURL('')

export default function App() {
  const [publishableKey, setPublishableKey] = useState("");

  useEffect(() => {
    const init = async () => {
      const publishableKey = await fetchPublishableKey();
      if (publishableKey) setPublishableKey(publishableKey);
    }

    init();
  }, [])

  return (
    <StripeProvider 
      publishableKey={publishableKey}
      urlScheme={urlScheme}
    >
        <PaymentCard />
    </StripeProvider>
  );
}