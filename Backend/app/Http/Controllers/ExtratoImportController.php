<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ExtratoImportController extends Controller
{
    /**
    * Processa o upload de um arquivo CSV e retorna os dados extraídos. 
    */
        public function importar(Request $request)
        {
        $validator = Validator::make($request->all(), [
            'arquivo' => 'required|file|mimes:csv,txt|max:4096'
        ]);

        if ($validator->fails()) {
            return response()->json(['erro' => 'Arquivo inválido ou ausente.'], 422);
        }

        $file = $request->file('arquivo');
        $dados = [];

        if (($handle = fopen($file->getRealPath(), 'r')) !== false) {
            $linhaAtual = 0;

            while (($linha = fgetcsv($handle, 1000, ',')) !== false) {
                $linhaAtual++;

                if ($linhaAtual == 1) continue; // pula cabeçalho

                if (count($linha) < 4) continue;

                $dataBr = trim($linha[0]);
                $valor = trim($linha[1]);
                $identificador = trim($linha[2]);
                $descricao = trim($linha[3]);

                $dados[] = [
                    'data' => $this->converterData($dataBr),
                    'valor' => round(floatval(str_replace(',', '.', $valor)), 2),
                    'descricao' => $descricao,
                    'identificador' => $identificador,
                    'tipo' => $this->detectarTipo($valor),
                    'categoria_sugerida' => null,
                ];
            }

            fclose($handle);
        }

        return response()->json([
            'usuario_id' => Auth::id(),
            'banco_detectado' => 'Nubank',
            'registros' => $dados,
        ]);
    }

    private function converterData(string $data): ?string
    {
        try {
            $partes = explode('/', $data);
            if (count($partes) === 3) {
                return "{$partes[2]}-{$partes[1]}-{$partes[0]}";
            }
            return null;
        } catch (\Exception $e) {
            return null;
        }
    }

    private function detectarTipo(string $valor): string
    {
        return ((float) $valor) >= 0 ? 'receita' : 'despesa';
    }
}
