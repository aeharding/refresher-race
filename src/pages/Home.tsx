import MessageListItem from "../components/MessageListItem";
import { useEffect, useState } from "react";
import { Message, getMessages } from "../data/messages";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { VList } from "virtua";

const Home: React.FC = () => {
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List />
      </IonContent>
    </IonPage>
  );
};

function List() {
  const [messages, setMessages] = useState<Message[]>(getMessages());
  const [loaded, setLoaded] = useState<boolean | undefined>(undefined);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 1_000);
  };

  useEffect(() => {
    setLoaded(false);

    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  const feed =
    loaded && messages ? (
      <VList
        className="ion-content-scroll-host"
        style={{ overflowY: "scroll" }}
      >
        {messages.map((m) => (
          <MessageListItem key={m.id} message={m} />
        ))}
      </VList>
    ) : (
      ""
    );

  if (loaded === false) return <IonSpinner />;

  return (
    <>
      <IonRefresher slot="fixed" disabled={false} onIonRefresh={refresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      {feed}
    </>
  );
}
export default Home;
