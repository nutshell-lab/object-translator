# object-translator

> Just a tool to translate objects keys

The typical use-case is to query a forgeign API don't use English as work language...

## Install

```
$ yarn add @nutshelllab/object-translator
```

## Usage

### import
`import Translator from '@nutshelllab/object-translator'`

### initialize
`const translator = new Translator(dictionnary, aliases)`

> dictionnary sample
```json
{
  "etablissement": {
    "nom": "name",
    "utilisateurs": "users"
  },
  "utilisateur": {
    "nom": "lastName",
    "prenom": "firstName",
    "civilite": "gender",
    "datedenaissance": "birthDate",
    "etablissements": "companies"
  }
}
```

> aliases sample
```json
{
  "etablissement": ["etablissement", "etablissements"],
  "utilisateur": ["utilisateur", "utilisateurs"]
}
```

### Use it

You can now use it everywhere you want ! Here is some samples.

#### String

```js
translator.run('utilisateur', 'nom')
```
> exptected result : `lastName`

#### Object

```js
const object = { 
  nom: 'Doe',
  prenom: 'John',
  civilite: 'M',
  datedenaissance: '25-02-1994',
  unknow: 123
}
translator.run('utilisateur', object)
```
> exptected result : 
```js
{ 
  lastName: 'Doe',
  firstName: 'John',
  gender: 'M',
  birthDate: '25-02-1994',
  unknow: 123
}
```

#### Array

```js
const array = ['nom', 'prenom', 'civilite', 'unknow']
translator.run('utilisateur', array)
```
> exptected result : 
```js
['lastName', 'firstName', 'gender', 'unknow']
```

#### MultiType Object

```js
const object = { 
  nom: 'Doe',
  etablissements: { 
    nom: 'Nutshell'
  }
}
```
> exptected result : 
```js
{ 
  lastName: 'Doe',
  companies: { 
    name: 'Nutshell'
  }
}
```

