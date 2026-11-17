import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {

    admin: ({ req : { user } }) => 
      user?.role === "admin" || user?.role === "editor",

    //Hvem skal ha lov til å opprette brukere
    create: ({ req: { user } }) => user?.role === "admin",

    //Hvilke brukere skal de forskjellige rollene se?
    read: ({ req: { user } }) => {
      if(!user) return false;
      if(user.role === "admin") return true;
      return { id: { equals: user.id } }
    },

    //Hvem skal kunne oppdatere brukere
    update: ({ req: { user } }) => {
      if(!user) return false;
      if(user.role === "admin") return true;
      return { id: { equals: user.id } }
    },

    //Hvem skal kunne slette brukere?
    delete: ({ req: { user } }) => user?.role === "admin",
    
    //Hvem skal kunne låse opp en sperret konto?
    unlock: ({ req: { user } }) => user?.role === "admin",

  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "role",
      label: "Rolle",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Administrator", value: "admin" },
        { label: "Redaktør", value: "editor" },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === "admin",
      }
    },
  ],
}
