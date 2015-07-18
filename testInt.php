<?php
echo 4700000/500;
echo thirtyTwoBitIntval(4700000/500);
function thirtyTwoBitIntval($value)
{
    if ($value < -2147483648)
    {
        return -(-($value) & 0xffffffff);
    }
    elseif ($value > 2147483647)
    {
        return ($value & 0xffffffff);
    }
    return $value;
}
?>