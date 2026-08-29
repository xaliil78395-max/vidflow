FROM node:22-bookworm

# System dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    curl \
    ca-certificates \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install Deno
RUN curl -fsSL https://deno.land/install.sh | sh

ENV DENO_INSTALL=/root/.deno
ENV PATH="/root/.deno/bin:$PATH"

# Install yt-dlp
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# Install the yt-dlp PO Token plugin
RUN python3 -m pip install --break-system-packages \
    bgutil-ytdlp-pot-provider

# Build the PO Token generation script
RUN mkdir -p /opt/bgutil && \
    curl -L https://github.com/Brainicism/bgutil-ytdlp-pot-provider/archive/refs/tags/1.3.1.tar.gz \
    -o /tmp/bgutil.tar.gz && \
    tar -xzf /tmp/bgutil.tar.gz -C /opt/bgutil --strip-components=1 && \
    cd /opt/bgutil/server && \
    npm ci && \
    npx tsc && \
    rm -f /tmp/bgutil.tar.gz

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN mkdir -p /app/public/generated

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
