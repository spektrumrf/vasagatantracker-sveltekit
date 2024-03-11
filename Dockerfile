FROM mcr.microsoft.com/devcontainers/typescript-node
RUN apt update && apt upgrade 
RUN git clone --single-branch --branch node https://github.com/jonaswesterlund/nvim.git /home/node/.config/nvim && \
git config --global --add safe.directory /home/node/.config/nvim
RUN curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux64.tar.gz && \
sudo rm -rf /opt/nvim && \
sudo tar -C /opt -xzf nvim-linux64.tar.gz && export PATH=$PATH:/opt/nvim-linux64/bin
