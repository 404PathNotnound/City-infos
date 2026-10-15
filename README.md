# City Explorer

Application Angular permettant de rechercher une ville et d’afficher sa météo,
la qualité de son air et les informations de son pays.

## Démarrer

```bash
npm install
npm start
```

Puis ouvrir `http://localhost:4200`.

## Architecture

- `core/services` contient les accès aux APIs et la transformation des réponses.
- `core/facades` orchestre les recherches et combine les données de la ville.
- `features` contient les composants de l’interface.

Les requêtes indépendantes sont exécutées en parallèle et les erreurs réseau
sont représentées par un état d’interface explicite.
