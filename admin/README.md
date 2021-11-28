# admin

To generate api token and register as user, use this script.

# setup

1. `$ yarn` at `/admin` to install dependencies.
2. Create service account key file(json) via GCP Console's "IAM and management".
3. Fill `src/.serviceAccount.sample.ts` and rename to `.serviceAccount.ts`.
4. Run `$ yarn prod` to generate token in production's firestore.
  > Note: Generate token to local, use `$ yarn local`.
5. Generated unique token.

```
Issued Token: TOKEN_STRING
```

6. When asked `UserName?` from terminal, input userName and push enter.

```
UserName?
> USERNAME
```

7. Created token and user in firestore.
