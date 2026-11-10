FROM node:24-alpine
WORKDIR /app
COPY package.json server.mjs ./
COPY public ./public
COPY scripts ./scripts
RUN mkdir -p /app/data && chown -R node:node /app
USER node
ENV PORT=3000 HOST=0.0.0.0
EXPOSE 3000
VOLUME ["/app/data"]
HEALTHCHECK --interval=30s --timeout=3s CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.mjs"]
