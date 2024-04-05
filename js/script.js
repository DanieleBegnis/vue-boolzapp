/* Milestone 1
- Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) 
e dall’interlocutore (bianco) assegnando due classi CSS diverse
- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
Milestone 2
- Visualizzazione dinamica dei messaggi: 
tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
- Click sul contatto mostra la conversazione del contatto cliccato
Milestone 3
- Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra,
come messaggio verde
- Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
Milestone 4
- Ricerca utenti: scrivendo qualcosa nell’input a sinistra,
 vengono visualizzati solo i contatti il cui nome contiene le lettere inserite
  (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina) */




const { createApp } = Vue;
const dt = luxon.DateTime

createApp({
  data() {
    return {
      contacts: [{
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Hai portato a spasso il cane?',
          status: 'sent'
        },
        {
          date: '10/01/2020 15:50:00',
          message: 'Ricordati di dargli da mangiare',
          status: 'sent'
        },
        {
          date: '10/01/2020 16:15:22',
          message: 'Tutto fatto!',
          status: 'received'
        }
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [{
          date: '20/03/2020 16:30:00',
          message: 'Ciao come stai?',
          status: 'sent'
        },
        {
          date: '20/03/2020 16:30:55',
          message: 'Bene grazie! Stasera ci vediamo?',
          status: 'received'
        },
        {
          date: '20/03/2020 16:35:00',
          message: 'Mi piacerebbe ma devo andare a fare la spesa.',
          status: 'received'
        }
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [{
          date: '28/03/2020 10:10:40',
          message: 'La Marianna va in campagna',
          status: 'received'
        },
        {
          date: '28/03/2020 10:20:10',
          message: 'Sicuro di non aver sbagliato chat?',
          status: 'sent'
        },
        {
          date: '28/03/2020 16:15:22',
          message: 'Ah scusa!',
          status: 'received'
        }
        ],
      },
      {
        name: 'Luisa',
        avatar: '_4',
        visible: true,
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Lo sai che ha aperto una nuova pizzeria?',
          status: 'sent'
        },
        {
          date: '10/01/2020 15:50:00',
          message: 'Si, ma preferirei andare al cinema',
          status: 'received'
        }
        ],
      },
      ],
      activeChat: 0,
      searchContactText: "",
      newUserMessage: "",
      date: '',
    };
  },
  methods: {
    //funzione che rende attivo il contatto
    isActive(index) {
      if (this.currentChat === index) {
        return 'active';
      }
      return '';
    },
    //funzione chat attuale
    activateChat: function (clickedIndex) {
      this.activeChat = clickedIndex;
      console.log(clickedIndex)
    },
    //funzione che aggiunge nuovo messaggio
    addNewMessage(activeChat) {
      const currentDate = dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
      const newMessage = {
        date: currentDate,
        message: this.newUserMessage,
        status: 'sent'
      }
      //pusho messaggio nuovo e azzero campo inserimento
      this.contacts[this.activeChat].messages.push(newMessage);
      this.newUserMessage = '';
      //risposta automatica dopo 1 secondo
      setTimeout(() => {
        const responseMessage = {
          date: currentDate,
          message: 'ok',
          status: 'received'
        }
        this.contacts[this.activeChat].messages.push(responseMessage)
      }, 1000)
    },
    //funzione che cerca i contatti
    searchContact() {
      this.contacts.forEach(contact => {
        const search = this.searchContactText.toLowerCase();
        console.log(search)
        if (!(contact.name.toLowerCase().includes(this.searchContactText.toLowerCase()))) {
          contact.visible = false;
          console.log(contact)
        } else {
          contact.visible = true;
        }
      });
    },
    getLastMessage(contact) {
      console.log(contact)
      const lastMessageObj = contact.messages[contact.messages.length - 1];
      if (lastMessageObj.status === 'sent') {
        return `Tu: ${lastMessageObj.message}`
      }
      return `${contact.name}: ${lastMessageObj.message}`
    },
    getLastMessageTime(contact) {
      const lastMessageObj = contact.messages[contact.messages.length - 1];
      console.log( lastMessageObj.date instanceof Date);
      return dt.fromFormat(lastMessageObj.date, 'dd/MM/yyyy hh:mm:ss', {locale: 'it'}).toLocaleString(dt.TIME_24_SIMPLE);
    }
  }
}).mount('#app');
