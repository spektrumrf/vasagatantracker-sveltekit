FROM mcr.microsoft.com/devcontainers/typescript-node
RUN apt update && apt upgrade && apt -y install neovim
RUN git config --global user.email "login@jonaswesterlund.fi" && git config --global user.name "Jonas Westerlund"
RUN cd /home/node/.config && git clone git@github.com:jonaswesterlund/nvim.git@node
