
export function criarApresentador(caminho:any, chave:any) {

  // Buscar no Banco de Dados lista.

  // Atualizar Fila

  // 

  return 'Criado'
}
/* var fs = require('fs')
var request = require('request');

module.exports = { 
  start: function (chave:string) { return iniciar(chave)}
}

async function iniciar(chave) {

  url = await vozUrl();
  gravouAudio = await gravarAudio(url);
  gravouVideo = await gravarVideo(chave);

  console.log(chave);

  return 'FINALIZADO' + chave;

}

var path = require("path");


async function gravarVideo(chave) {

  const ffmpeg = require("fluent-ffmpeg");
  const path = require('path');

  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  const ffprobePath = require('@ffprobe-installer/ffprobe').path;
  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath);

  var videoUm = './video-01.m4v';
  var audioUm = './audioOK.mp3';
  var imagem = 'imagem2.jpg';
  var data = Date.now();
  var saida = './arquivo-salvo/' + chave.data + '.mp4';

  return new Promise((resolve, reject) => {

    ffmpeg.ffprobe('./audioOK.mp3', function (err, metadata) {

      ffmpeg()
        .input(videoUm)
        .addInput(audioUm)
        .outputOptions([
          "-filter:v drawtext=text='www.V8SITES.com.br:x=W-350:y=H-th-10:fontsize=32:fontfile=consolab.ttf:fontcolor=white",
        ])
        .setDuration(metadata.format.duration)
        .on('error', function (err) {
          console.log('Ocorreu um Erro: ' + err.message);
          return reject('Ocorreu um Erro: ' + err.message);
        })
        .on('end', function () {
          console.log('Processamento Finalizado!');
          return resolve('Processado');
        })
        .size('320x200')
        .saveToFile(saida, 'temp/');
    });

  });
}

function gravarAudio(url) {

  return new Promise((resolve, reject) => {

    request
      .get(url)
      .on('error', function (err) {
        reject(err);
      })
      .on('complete', function () {
        resolve('gravouAudio');
      })
      .pipe(
        fs.createWriteStream('audioOK.mp3')
      );
  });

}

function vozUrl() {

  var AWS = require("aws-sdk");

  AWS.config.region = "us-east-2";
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:8eface0a-7adb-494c-94f0-999de0bbd0cc"
  });

  var parametros = {

    LanguageCode: "pt-BR",
    VoiceId: "Ricardo",
    Text: "Bom dia Émerson como você está meu amigo querido.",

    Engine: "standard",
    OutputFormat: "mp3",
    SampleRate: "16000",
    TextType: "text",

  };
  var carregar = new AWS.Polly.Presigner()
  return new Promise((resolve, reject) => {

    carregar.getSynthesizeSpeechUrl(parametros, 700, (error, url) => {
      if (error) {
        console.log("Erro buscar Polly URL: " + error.message);
        reject(error.message);
      } else {
        resolve(url);
      }
    }
    );
  });
} */