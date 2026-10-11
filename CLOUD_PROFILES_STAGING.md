# Cloud profiles — staging only

This branch is a non-production work area. The live game on main is unchanged.

The existing public.aaq_revision table already has per-user RLS policies. The student registration feature still requires a hardened server-side endpoint, abuse controls, and cross-device end-to-end tests before it can be published.

Do not deploy the cloud profile staging ZIP directly to main. Do not expose service-role credentials in browser code.

Original approved design and game logic must remain unchanged.
