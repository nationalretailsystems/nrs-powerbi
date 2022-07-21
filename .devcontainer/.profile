PATH=/QOpenSys/pkgs/bin:$PATH
export PATH

LIB=YOUR_DEVELOPMENT_LIBRARY
export LIB

if [ -z "$QIBM_USE_DESCRIPTOR_STDIO" ]; then
    # If we're in an SSH session, use bash
    bash
    exit
else
    # If we're in QP2TERM or QSH, no colors + no bash
    PS1="eradani-connect [$(id -un)]> "
fi
