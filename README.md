# FishEye
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Objectif

Création d’un site accessible pour une plateforme de photographes

## Choix technique :
- Approche POO
- Architecture Single Page App
- Transformation JSON en modèles de données ( data model)
- Design Pattern Factory Method – Pages & Médias

## Contraintes
- Responsive (Mobile et Desktop)
- Utilisation du Design Pattern « Factory Method »
- Accessibilité: utilisation de balises ARIA, navigation au clavier
- Tests d’accessibillté

## Transformation du JSON en modèle de données
Avantages:
- Typage JSDoc
- 1 modèle de données par page => rendre plus simple le code d'une page

[comment]: <> (```mermaid)
[comment]: <> (graph LR)
[comment]: <> (HomePageModel -- 0..* --> PhotographerProfileModel)
[comment]: <> (AppModel -- 1..1 --> HomePageModel)
[comment]: <> (AppModel -- 1..1 -->  PhotographerPageModel)
[comment]: <> (PhotographerPageModel -- 0..* --> PhotographerProfileModel)
[comment]: <> (PhotographerPageModel -- 0..* --> MediumModel)
[comment]: <> (```)

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5ncmFwaCBMUlxuSG9tZVBhZ2VNb2RlbCAtLSAwLi4qIC0tPiBQaG90b2dyYXBoZXJQcm9maWxlTW9kZWxcbkFwcE1vZGVsIC0tIDEuLjEgLS0-IEhvbWVQYWdlTW9kZWxcbkFwcE1vZGVsIC0tIDEuLjEgLS0-ICBQaG90b2dyYXBoZXJQYWdlTW9kZWxcblBob3RvZ3JhcGhlclBhZ2VNb2RlbCAtLSAwLi4qIC0tPiBQaG90b2dyYXBoZXJQcm9maWxlTW9kZWxcblBob3RvZ3JhcGhlclBhZ2VNb2RlbCAtLSAwLi4qIC0tPiBNZWRpdW1Nb2RlbFxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjp0cnVlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)](https://mermaid.live/edit#eyJjb2RlIjoiXG5ncmFwaCBMUlxuSG9tZVBhZ2VNb2RlbCAtLSAwLi4qIC0tPiBQaG90b2dyYXBoZXJQcm9maWxlTW9kZWxcbkFwcE1vZGVsIC0tIDEuLjEgLS0-IEhvbWVQYWdlTW9kZWxcbkFwcE1vZGVsIC0tIDEuLjEgLS0-ICBQaG90b2dyYXBoZXJQYWdlTW9kZWxcblBob3RvZ3JhcGhlclBhZ2VNb2RlbCAtLSAwLi4qIC0tPiBQaG90b2dyYXBoZXJQcm9maWxlTW9kZWxcblBob3RvZ3JhcGhlclBhZ2VNb2RlbCAtLSAwLi4qIC0tPiBNZWRpdW1Nb2RlbFxuIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6dHJ1ZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)

## Design Pattern Factory  –  Pages & Médias

Dans ce projet on à réalisé deux factories, 1 pour les médias et l'autre pour les pages. L'objectif est de fournir un modèle générique pour la création d'objets.

[comment]: <> (```mermaid)
[comment]: <> (graph LR)
[comment]: <> (PageFactory --> PageBuilder)
[comment]: <> (PageBuilder --> HomePageBuilder)
[comment]: <> (PageBuilder --> PhotographerPageBuilder)
[comment]: <> (```)
[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFJcblBhZ2VGYWN0b3J5IC0tPiBQYWdlQnVpbGRlclxuUGFnZUJ1aWxkZXIgLS0-IEhvbWVQYWdlQnVpbGRlclxuUGFnZUJ1aWxkZXIgLS0-IFBob3RvZ3JhcGhlclBhZ2VCdWlsZGVyIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)](https://mermaid.live/edit#eyJjb2RlIjoiZ3JhcGggTFJcblBhZ2VGYWN0b3J5IC0tPiBQYWdlQnVpbGRlclxuUGFnZUJ1aWxkZXIgLS0-IEhvbWVQYWdlQnVpbGRlclxuUGFnZUJ1aWxkZXIgLS0-IFBob3RvZ3JhcGhlclBhZ2VCdWlsZGVyIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

[comment]: <> (```mermaid)
[comment]: <> (graph LR)
[comment]: <> (MediaFactory --> Media)
[comment]: <> (Media --> Picture)
[comment]: <> (Media --> Video)
[comment]: <> (```)
[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFJcbk1lZGlhRmFjdG9yeSAtLT4gTWVkaWFcbk1lZGlhIC0tPiBQaWN0dXJlXG5NZWRpYSAtLT4gVmlkZW8iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)](https://mermaid.live/edit#eyJjb2RlIjoiZ3JhcGggTFJcbk1lZGlhRmFjdG9yeSAtLT4gTWVkaWFcbk1lZGlhIC0tPiBQaWN0dXJlXG5NZWRpYSAtLT4gVmlkZW8iLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwiZGVmYXVsdFwiXG59IiwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)

## Captures
TODO

## Lien
TODO
