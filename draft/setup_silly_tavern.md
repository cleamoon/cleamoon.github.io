# Setup Silly Tavern

## Install requirements

Download and install latest Node.js and git. 

## Download from their github repo

On Windows, it is important to not download it to a path that is controlled by the system, like Program Files, System32, etc.

```bash
git clone https://github.com/sillytavern/sillytavern.git
```

## Run the launcher

```bash
cd SillyTavern
./start.sh
```


# Setup Text Generation Web UI for SillyTavern

## Download from their github repo

```bash
git clone https://github.com/oobabooga/text-generation-webui.git
```

## Start the Text Generation Web UI for the first time

* Run the script that matches your OS: `start_linux.sh`, `start_windows.bat`, `start_macos.sh`, or `start_wsl.bat`.
* Select the GPU vendor when asked. 

## Download a LLM model to Text

* Go to the `Models` tab on the web UI.
* Download the model you want to use. For example, for role playing with SillyTavern, you can try 'Sao10K/L3-8B-Stheno-v3.2'.

# Rerun the Text Generation Web UI as an API

* Run the script that matches your OS: `start_linux.sh`, `start_windows.bat`, `start_macos.sh`, or `start_wsl.bat` with the `--api` flag.
* Go to the `Models` tab on the web UI.
* Select and load the model you want to use.


# Setup Stable Diffusion Web UI for SillyTavern

## Download from their github repo

```bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
```

## Download the model you want to use

* Find a model you want to use on websites like https://civitai.com/
* Download the model to the `models/Stable-diffusion` folder.

## Run the Stable Diffusion Web UI

* Run the script that matches your OS: `start_linux.sh`, `start_windows.bat`, `start_macos.sh`, or `start_wsl.bat`.

# Configure SillyTavern to use the services

* Go to the `Settings` tab on the SillyTavern web UI.
* Configure the services you want to use.






